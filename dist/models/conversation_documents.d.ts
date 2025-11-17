import type { Optional } from 'sequelize';
import { Model } from 'sequelize';
export interface ConversationDocumentsAttributes {
    id: string;
    conversation_id: string;
    document_id: string;
    linked_at: Date;
}
export interface ConversationDocumentsCreationAttributes extends Optional<ConversationDocumentsAttributes, 'id' | 'linked_at'> {
}
declare class ConversationDocuments extends Model<ConversationDocumentsAttributes, ConversationDocumentsCreationAttributes> implements ConversationDocumentsAttributes {
    id: string;
    conversation_id: string;
    document_id: string;
    linked_at: Date;
}
export default ConversationDocuments;
