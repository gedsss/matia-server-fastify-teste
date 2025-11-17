import type { Optional } from 'sequelize';
import { Model } from 'sequelize';
export interface ConversationAttributes {
    id: string;
    user_id: string;
    title: string;
    is_favorite: boolean;
    last_message_at: Date | null;
    created_at: Date;
    updated_at: Date;
}
export interface ConversationCreationAttributes extends Optional<ConversationAttributes, 'id' | 'created_at' | 'updated_at' | 'last_message_at'> {
}
declare class Conversation extends Model<ConversationAttributes, ConversationCreationAttributes> implements ConversationAttributes {
    id: string;
    user_id: string;
    title: string;
    is_favorite: boolean;
    last_message_at: Date | null;
    created_at: Date;
    updated_at: Date;
}
export default Conversation;
