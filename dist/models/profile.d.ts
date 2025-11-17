import type { Optional } from 'sequelize';
import { Model } from 'sequelize';
export interface ProfileAttributes {
    id: string;
    creation_time: Date;
    updated_at: Date | null;
    profile_password: string;
    cpf: string;
    telefone: string;
    data_nascimento: Date;
    avatar_url: string | null;
    nome: string;
    email: string;
}
export interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'updated_at' | 'avatar_url' | 'id' | 'creation_time'> {
}
declare class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> implements ProfileAttributes {
    id: string;
    creation_time: Date;
    updated_at: null | Date;
    profile_password: string;
    cpf: string;
    telefone: string;
    data_nascimento: Date;
    avatar_url: string | null;
    nome: string;
    email: string;
}
export default Profile;
