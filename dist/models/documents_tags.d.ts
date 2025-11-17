import type { Optional } from 'sequelize';
import { Model } from 'sequelize';
export interface DocumentsTagsAttributes {
    id: string;
    name: string;
    color: string;
    created_at: Date;
}
export interface DocumentsTagsCreationAttributes extends Optional<DocumentsTagsAttributes, 'color' | 'id' | 'created_at'> {
}
declare class DocumentsTags extends Model<DocumentsTagsAttributes, DocumentsTagsCreationAttributes> implements DocumentsTagsAttributes {
    id: string;
    name: string;
    color: string;
    created_at: Date;
}
export default DocumentsTags;
