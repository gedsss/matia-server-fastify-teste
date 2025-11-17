import type { Optional } from 'sequelize';
import { Model } from 'sequelize';
export interface ActivityLogsAttributes {
    id: string;
    user_id: string;
    action: 'login' | 'upload_document' | 'delete_user';
    entity_type: 'document' | 'user' | 'conversation' | null;
    entity_id: string | null;
    metadata: object | null;
    ip_address: string | null;
    created_at: Date;
}
export interface ActivityLogsCreationAttributes extends Optional<ActivityLogsAttributes, 'id' | 'created_at' | 'ip_address' | 'metadata' | 'entity_type' | 'entity_id'> {
}
declare class ActivityLog extends Model<ActivityLogsAttributes, ActivityLogsCreationAttributes> implements ActivityLogsAttributes {
    id: string;
    user_id: string;
    action: 'login' | 'upload_document' | 'delete_user';
    entity_id: string | null;
    entity_type: 'document' | 'user' | 'conversation' | null;
    metadata: Object | null;
    ip_address: string | null;
    created_at: Date;
}
export default ActivityLog;
