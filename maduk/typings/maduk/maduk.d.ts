
declare namespace Maduk {
    interface Actions {
        constrcutorOpenFloat(): { type: string }
        constrcutorCloseFloat(): { type: string }
        changeColorProtocol(): { type: string }
        checkInputs(): { type: string, payload: { id: string, value: string } }
        setBrowsersForTest(browser: string): { type: string, payload: { browser: string } }
        createNewConstructor(fields: any): { type: number, values: {
            name: string;
            target: string;
            aplication: string;
            version: string | number;
            architecture: string;
            domType: string;
            testType: string;
            appType: string;
            protocol: string;
        }}
    }
    
    interface NewConstructor {
           type: string;
           values: {
                name: string;
            target: string;
            aplication: string;
            version: string | number;
            architecture: string;
            domType: string;
            testType: string;
            appType: string;
            protocol: string;
           }
    }

    interface fields {
        active: boolean
        checked: boolean
        dirty: boolean
        initialValue: string | number
        invalid: boolean
        name: string
        onBlur(): void
        onChange(event): void
        onDragStart(event): void
        onDrop(event): void
        onFocus(): void
        onUpdate(event)
        pristine: boolean
        touched: boolean
        valid: boolean
        value: string | string[]
        visited: boolean
    }


    interface fieldsConstructor <F>{
        name: F;
        target: F;
        aplication: F;
        version: F;
        architecture: F;
        domType: F;
        testType: F;
        appType: F;
        protocol: F;
    }
    

    // type FormConfig = {
    //     form: string,
    //     fields: string[]
    // };
}

declare module "Maduk" {
    var Maduk: Maduk.Actions;
    export = Maduk;
}

