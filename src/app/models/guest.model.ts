export interface Guest {
    id?: string,
    name: string;
    isInvited?: boolean;
    confirmed?: boolean;
    plusOne?: {
        name: string
    }
}