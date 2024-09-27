class LogicMersenneTwisterRandom {
    SEED_COUNT = 624;
    ix = 0;

    constructor (seed = 324876476) {
        this.seeds = [ seed ];

        for (let i = 1; i < this.SEED_COUNT; i++) {
            const seedFill = 1812433253 * (seed ^ (seed >> 30)) + 1812433253;
            this.seeds[i] = seedFill;
        }
    }

    initialize (seed) {
        this.ix = 0;
        this.seeds[0] = seed;

        for (let i = 1; i < this.SEED_COUNT; i++) {
            const seedFill = 1812433253 * (seed ^ (seed >> 30)) + 1812433253;
            this.seeds[i] = seedFill;
        }
    }

    generate () {
        for (let i = 0, j = 0; i < this.SEED_COUNT; i++, j++) {
            const v4 = (this.seeds[i % this.seeds.length] & 0x7fffffff) + (this.seeds[j] & -0x80000000);
            let v6 = (v4 >> 1) ^ this.seeds[(i + 396) % this.seeds.length];

            if ((v4 & 1) === 1) v6 ^= -0x66F74F21;

            this.seeds[j] = v6
        }
    }

    nextInt () {
        if (this.ix === 0) this.generate();

        let seed = this.seeds[this.ix];
        this.ix = (this.ix + 1) % 624;

        seed ^= seed >> 11;
        seed = seed ^ ((seed << 7) & -1658038656) ^ (((seed ^ ((seed << 7) & -1658038656)) << 15) & -0x103A0000) ^
                   ((seed ^ ((seed << 7) & -1658038656) ^ (((seed ^ ((seed << 7) & -1658038656)) << 15) & -0x103A0000)) >> 18);

        return seed
    }

    rand (max) {
        let int = this.nextInt();

        if (int < 0) int = -int;

        return int % max
    }
}

module.exports = LogicMersenneTwisterRandom