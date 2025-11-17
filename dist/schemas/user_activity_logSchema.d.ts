import type { FastifySchema } from 'fastify';
export declare const createUserActivityLogSchema: FastifySchema;
export declare const updateUserActivityLogSchema: {
    body: {
        type: string;
        required: never[];
        properties: {
            readonly user_id: {
                readonly type: "string";
                readonly format: "uuid";
            };
            readonly action_type: {
                readonly type: "string";
                readonly description: "Tipo de ação realizada (Enum)";
                readonly enum: readonly ["login", "logout", "conversation_created", "message_sent", "document_uploaded", "document_viewed", "document_deleted", "profile_updated", "password_changed"];
            };
            readonly resource_type: {
                readonly type: "string";
                readonly nullable: true;
            };
            readonly resource_id: {
                readonly type: "string";
                readonly format: "uuid";
                readonly nullable: true;
            };
            readonly details: {
                readonly type: readonly ["object", "array", "null"];
                readonly nullable: true;
            };
            readonly ip_address: {
                readonly type: "string";
                readonly maxLength: 45;
                readonly nullable: true;
            };
            readonly user_agent: {
                readonly type: "string";
                readonly nullable: true;
            };
        };
        additionalProperties: boolean;
    };
};
export declare const userActivityLogParamsSchema: FastifySchema;
