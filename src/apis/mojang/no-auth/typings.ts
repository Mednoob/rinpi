export type ErrorResponse = { error: string } & ({ errorMessage: string } | { path: string });

export interface PlayerIdentity {
    name: string;
    id: string;
}

export interface EncodedProfileProperty {
    name: string;
    value: string;
    signature: string;
}

export interface DecodedProfileProperty {
    timestamp: number;
    profileId: string;
    profileName: string;
    textures: {
        SKIN: {
            url: string;
            metadata: {
                model: "classic" | "slim";
            };
        };
        CAPE?: {
            url: string;
        };
    };
}

export interface PlayerProfile<D extends boolean = false> extends PlayerIdentity {
    properties: (D extends true ? DecodedProfileProperty : EncodedProfileProperty)[];
    legacy?: true;
}

export interface UsernameHistory {
    name: string;
    changedToAt: number;
}
