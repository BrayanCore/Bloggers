export class Blogger {
    public constructor(init?: Partial<Blogger>) {
        Object.assign(this, init);
    }

    id: "";
    name: "";
    website: "";
    picture_url: "";
    email: "";
    friends: number[];
}