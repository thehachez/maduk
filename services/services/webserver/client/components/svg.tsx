import * as React from 'react';

// TASKS TYPES ICONS

export class ItemConfig extends React.Component<any, any> {
    render() {
        return (
            <svg fill="#000000" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
            </svg>
        )
    }
}


export class ItemFlag extends React.Component<any, any> {
    render() {
        return (
            <svg fill="#000000" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
            </svg>
        )
    }
}

export class ItemLabel extends React.Component<any, any> {
    render() {
        return (
            <svg fill="#000000" viewBox="0 0 24 24" >
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
            </svg>
        )
    }
}

export class ItemAddStage extends React.Component<any, any> {
    render() {
        return (
            <svg fill="#000000" viewBox="0 0 24 24" >
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"/>
            </svg>
        )
    }
}

export class ItemHot extends React.Component<any, any> {
    render() {
        return (
            <svg x="0px" y="0px" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
                <path fill="#DD2C00" d="M39,28c0,8.395-6.606,15-15.001,15S9,36.395,9,28S22.479,12.6,20.959,5C24,5,39,15.841,39,28z" />
                <path fill="#FF5722" d="M33,32c0-7.599-9-15-9-15c0,6.08-9,8.921-9,15c0,5.036,3.963,9,9,9S33,37.036,33,32z" />
                <path fill="#FFC107" d="M18.999,35.406C19,32,24,30.051,24,27c0,0,4.999,3.832,4.999,8.406c0,2.525-2.237,4.574-5,4.574S18.998, 37.932, 18.999, 35.406z" />
            </svg>
        )
    }
}

export class ItemCodeColor extends React.Component<any, any> {
    render() {
        return (
            <svg x="0px" y="0px" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
                <g>
                    <polygon fill="#333" points="36,34 33,31.5 39.8,24 33,16.5 36,14 45,24     " />
                    <polygon fill="#333" points="13,34 4,24 13,14 16,16.5 9.1,24 16,31.5     " />
                </g>
                <polygon fill="#40ce00" points="21,39 17.2,37.7 27,9 30.8,10.3 " />
            </svg>
        )
    }
}

export class ItemList extends React.Component<any, any> {
    render() {
        return (
            <svg fill="#000000"  viewBox="0 0 24 24" >
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        )
    }
}

export class ItemRedoList extends React.Component<any, any> {
    render() {
        return (
            <svg fill="#000000"  viewBox="0 0 24 24" >
                <path d="M14 5h8v2h-8zm0 5.5h8v2h-8zm0 5.5h8v2h-8zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        )
    }
}

export class ItemCode extends React.Component<any, any> {
    render() {
        return (
            <svg fill="#000000" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
            </svg>
        )
    }
}

export class ItemMinusCircle extends React.Component<any, any> {
    render() {
        return (
            <svg fill="#000000"  viewBox="0 0 24 24" >
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
        )
    }
}

export class ItemAddCircle extends React.Component<any, any> {
    render() {
        return (
            <svg fill="#000000"  viewBox="0 0 24 24" >
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
        )
    }
}

export class ItemSearch extends React.Component<any, any> {
    render() {
        return (
            <svg fill="#000000" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        )
    }
};


export class ItemMicro extends React.Component<any, any> {
    render() {
        return (
            <svg fill="#000000"  viewBox="0 0 24 24" >
                <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        )
    }
};

export class ItemClass extends React.Component<any, any> {
    render() {
        return (
            <svg fill="#000000" viewBox="0 0 24 24">
                <path d="M24 0H0v24h24z" fill="none"/>
                <path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"/>
            </svg>
        )
    }
};

export class ItemCheck extends React.Component<any, any> {
    render() {
        return (
            <svg fill="#000000" viewBox="0 0 24 24" >
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
        )
    }
};

export class ItemDel extends React.Component<any, any> {
    render() {
        return (
            <svg fill="#000000" viewBox="0 0 24 24" >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        )
    }
};

export class ItemEdit extends React.Component<any, any> {
    render() {
        return (
            <svg  fill="#000000" viewBox="0 0 24 24" >
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        )
    }
};