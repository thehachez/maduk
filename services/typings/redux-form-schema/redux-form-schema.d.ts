
declare namespace ReduxFormSchema {
    export function buildSchema(obj: any): void;
}

declare module "redux-form-schema" {
    export = ReduxFormSchema;
}

