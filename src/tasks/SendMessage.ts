import { Db } from 'mongodb';
import { FetchDiscordClient } from '../utils/Discord';
import { Project, Entry } from './WeeklyRoundUp';

export async function SendMessage(dbo: Db, projectID: String, mainProject: Project) {
    let StartDate = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
    let data = (await dbo
        .collection('EventResponses')
        .find({
            timestamp: {
                $gte: StartDate / 1000,
            },
            id: projectID,
        })
        .toArray()) as any as Entry[];

    let obj: { [Key: string]: number } = {};
    let trainingOBJ: { [Key: string]: number } = {};
    let total = 0;
    let lastTotal = 0;

    let superVisorPoints = mainProject.SupervisorPoints ?? 1;
    let coHostPoints = mainProject.CoHostingPoints ?? 1;

    data.forEach((Element) => {
        total++;

        let eventPoints = mainProject.HostingPoints ?? 1;
        let attendancePoints = mainProject.AttendeePoints ?? 1;

        obj[Element.host] = obj[Element.host] === undefined ? eventPoints : obj[Element.host] + eventPoints;
        obj[Element.supervisor] = obj[Element.supervisor] === undefined ? superVisorPoints : obj[Element.supervisor] + superVisorPoints;
        obj[Element.cohost] = obj[Element.cohost] === undefined ? superVisorPoints : obj[Element.cohost] + coHostPoints;
        trainingOBJ[Element.type] = trainingOBJ[Element.type] === undefined ? 1 : trainingOBJ[Element.type] + 1;

        Element.attendees.forEach((Element2: string) => {
            obj[Element2] = obj[Element2] === undefined ? attendancePoints : obj[Element2] + attendancePoints;
        });
    });

    delete obj['N/A'];
    delete obj['None'];
    delete trainingOBJ['None'];
    delete trainingOBJ['N/A'];

    let Array: { key: string; value: number }[] = [];
    Object.entries(obj).forEach(([key, value]) => {
        Array.push({ key, value });
    });
    let heighest: string[] = [];
    let endArray = [...Array];

    for (let i = 0; i < Array.length; i++) {
        let HeighestName = undefined;
        let value = -1;
        let pos = undefined;
        endArray.forEach((Element, i) => {
            if (Element.value > value) {
                pos = i;
                value = Element.value;
                HeighestName = Element.key;
            }
        });
        heighest.push(HeighestName);
        endArray.splice(pos, 1);
    }

    let WeekBeforeData = (await dbo
        .collection('EventResponses')
        .find({
            timestamp: {
                $gte: (StartDate - 7 * 24 * 60 * 60 * 1000) / 1000,
                $lt: StartDate / 1000,
            },
            id: projectID,
        })
        .toArray()) as any as Entry[];
    let Weekbeforeobj: { [Key: string]: number } = {};
    let WeekbeforetrainingOBJ: { [Key: string]: number } = {};
    WeekBeforeData.forEach((Element) => {
        lastTotal++;
        Weekbeforeobj[Element.host] = Weekbeforeobj[Element.host] === undefined ? 1 : Weekbeforeobj[Element.host] + 1;
        Weekbeforeobj[Element.supervisor] = Weekbeforeobj[Element.supervisor] === undefined ? 1 : Weekbeforeobj[Element.supervisor] + 1;
        Weekbeforeobj[Element.cohost] = Weekbeforeobj[Element.cohost] === undefined ? 1 : Weekbeforeobj[Element.cohost] + 1;
        WeekbeforetrainingOBJ[Element.type] =
            WeekbeforetrainingOBJ[Element.type] === undefined ? 1 : WeekbeforetrainingOBJ[Element.type] + 1;
    });
    delete Weekbeforeobj['N/A'];
    delete WeekbeforetrainingOBJ['None'];

    function GenerateTopThree() {
        let outArray = [];
        let too = Object.keys(obj).length;
        if (too > 20) too = 20;
        for (let i = 0; i < too; i++) {
            if (obj[heighest[i]] === 0) continue;

            outArray.push(
                `${i + 1}.)${
                    heighest[i] === undefined
                        ? 'No One!'
                        : ` ${heighest[i]} - ${obj[heighest[i]]} points ( ${
                              Weekbeforeobj[heighest[i]] < obj[heighest[i]] || Weekbeforeobj[heighest[i]] == undefined
                                  ? '⬆️'
                                  : Weekbeforeobj[heighest[i]] === obj[heighest[i]]
                                  ? '⏺️'
                                  : '⬇️'
                          }  ${
                              Weekbeforeobj[heighest[i]] === undefined
                                  ? obj[heighest[i]] * 100
                                  : (Math.round(((Weekbeforeobj[heighest[i]] - obj[heighest[i]]) / Weekbeforeobj[heighest[i]]) * 1000) /
                                        10) *
                                    -1
                          }%)`
                }`,
            );
        }
        return outArray.join('\n ');
    }

    function GenerateTrainings() {
        let endarray: string[] = [];

        mainProject.trainingTypes.forEach((data) => {
            if (trainingOBJ[data] === undefined) {
                trainingOBJ[data] = 0;
            }
            if (WeekbeforetrainingOBJ[data] === undefined) {
                WeekbeforetrainingOBJ[data] = 0;
            }
        });
        for (let property in trainingOBJ) {
            let lastWeekNum = WeekbeforetrainingOBJ[property] || 0;
            let thisWeekNum = trainingOBJ[property] || 0;
            endarray.push(
                `• ${property} - ${trainingOBJ[property]} events ( ${
                    lastWeekNum < thisWeekNum || lastWeekNum == undefined ? '⬆️' : lastWeekNum === thisWeekNum ? '⏺️' : '⬇️'
                }  ${lastWeekNum === 0 ? thisWeekNum * 100 : Math.round(((lastWeekNum - thisWeekNum) / lastWeekNum) * -1000) / 10}%)`,
            );
        }
        return endarray.join('\n ');
    }

    let totalIncrease = Math.round(((lastTotal - total) / lastTotal) * -1000) / 10;
    if (isFinite(totalIncrease) === false) {
        totalIncrease = total * 100;
    }

    let messsage = `__Weekly Round up for **${
        mainProject.name
    }**:__ \n \n ${GenerateTopThree()} \n\nThe trainings that happened this week are as followed: \n ${GenerateTrainings()} \n \nThis week there was a total of ${total} events, this is a ${
        total >= lastTotal ? 'increase' : 'decrease'
    } of ${totalIncrease}%. \n© *RovolutionLogistics 2020-${new Date().getFullYear()} *`;

    try {
        let client = FetchDiscordClient();
        let channel = client.channels.cache.get(mainProject.AnnouncementChannel.value);

        if (channel?.isText()) {
            await channel.send(messsage).catch((e) => console.log(e));
        }
    } catch {}
}
