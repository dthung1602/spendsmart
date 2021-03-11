type Compare = "=" | "<" | ">";

type Status = "waiting" | "on track" | "warning" | "failed" | "completed" | "abandoned";

class Target {
    constructor(
        public id: number,
        public title: string,
        private titleWords: [string],
        public startDate: Date,
        public endDate: Date,
        public categories: [string],
        public includeUnexpected: boolean,
        public compare: Compare,
        public total: number,
        public status: Status,
        public createdAt: Date,
    ) {
    }
}

export default Target;
