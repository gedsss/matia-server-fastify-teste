import type { Optional } from 'sequelize';
import { Model } from 'sequelize';
export interface UserActivityLogAttributes {
    id: string;
    user_id: string;
    action_type: 'login' | 'logout' | 'conversation_created' | 'message_sent' | 'document_uploaded' | 'document_viewed' | 'document_deleted' | 'profile_updated' | 'password_changed';
    resource_type: string | null;
    resource_id: string | null;
    details: object | null;
    ip_address: string | null;
    user_agent: string | null;
    created_at: Date;
}
export interface UserActivityLogCreationAttributes extends Optional<UserActivityLogAttributes, 'id' | 'created_at' | 'resource_type' | 'resource_id' | 'details' | 'ip_address' | 'user_agent'> {
}
declare class UserActivityLog extends Model<UserActivityLogAttributes, UserActivityLogCreationAttributes> implements UserActivityLogAttributes {
    id: string;
    user_id: string;
    action_type: 'login' | 'logout' | 'conversation_created' | 'message_sent' | 'document_uploaded' | 'document_viewed' | 'document_deleted' | 'profile_updated' | 'password_changed';
    resource_type: string | null;
    resource_id: string | null;
    details: object | null;
    ip_address: string | null;
    user_agent: string | null;
    created_at: Date;
}
export default UserActivityLog;
