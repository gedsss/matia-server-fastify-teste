import type { Optional } from 'sequelize';
import { Model } from 'sequelize';
export interface DocumentsTagsRelationsAttributes {
    id: string;
    document_id: string;
    tag_id: string;
    created_at: Date;
}
export interface DocumentsTagsRelationsCreationAttributes extends Optional<DocumentsTagsRelationsAttributes, 'id' | 'created_at'> {
}
declare class DocumentsTagsRelation extends Model<DocumentsTagsRelationsAttributes, DocumentsTagsRelationsCreationAttributes> implements DocumentsTagsRelationsAttributes {
    id: string;
    document_id: string;
    tag_id: string;
    created_at: Date;
}
export default DocumentsTagsRelation;
