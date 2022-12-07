import { Role } from 'discord.js';

export function RoleColours(role: Role) {
    return role.hexColor === '#000000' || role.hexColor === undefined ? '#ffffff' : role.hexColor;
}
