import { FetchMongo } from '../utils/Mongodb';
import { SendMessage } from './SendMessage';

export interface Project {
    _id: ID;
    UUID: string;
    type: number;
    name: string;
    owner: string;
    collaborators: any[];
    createdAt: number;
    updatedAt: number;
    api_key: string;
    CoHostingPoints: number;
    CoHosts: string;
    'Failed Training': string;
    HostingPoints: number;
    Supervisor: string;
    SupervisorPoints: number;
    description: string;
    discordId: DiscordID;
    image: string;
    imageTitle: string;
    title: string;
    trainingTypes: string[];
    channel: AnnouncementChannel;
    roles: AnnouncementChannel[];
    FailedTrainings: string;
    AnnouncementChannel: AnnouncementChannel;
    weeklyRoundUp: string;
    API_KEY: string;
    GroupID: number;
    AttendeePoints: number;
}

export interface AnnouncementChannel {
    label: string;
    value: string;
    color: string;
}

export interface ID {
    $oid: string;
}

export interface DiscordID {
    name: string;
    id: string;
    avatar: string;
}

export interface Entry {
    _id: ID;
    id: string;
    attendees: string[];
    cohost: string;
    failedTraining: string;
    host: string;
    image: string;
    notes: string;
    supervisor: string;
    type: string;
    timestamp: number;
}

export async function WeeklyRoundUp() {
    // Fetch all discords which want weekly round up!
    let mongoPromise = await FetchMongo();
    let collection = mongoPromise.db('RovolutionLogistics').collection('Projects');

    let projects = (await collection
        .find({
            weeklyRoundUp: 'true',
            type: 2,
        })
        .toArray()) as any as Project[];

    if (projects.length === 0) return;

    projects.forEach((e) => {
        SendMessage(mongoPromise.db('RovolutionLogistics'), e.UUID, e);
    });
}
