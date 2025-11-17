import type { Optional } from 'sequelize';
import { Model } from 'sequelize';
export interface MessagesAttributes {
    id: string;
    conversations_id: string;
    content: string;
    role: 'user' | 'assistant' | 'system';
    metadata: object | null;
    created_at: Date;
}
export interface MessagesCreationAttributes extends Optional<MessagesAttributes, 'metadata' | 'id' | 'created_at'> {
}
declare class Messages extends Model<MessagesAttributes, MessagesCreationAttributes> implements MessagesAttributes {
    id: string;
    conversations_id: string;
    content: string;
    role: 'user' | 'assistant' | 'system';
    metadata: object | null;
    created_at: Date;
}
export default Messages;
