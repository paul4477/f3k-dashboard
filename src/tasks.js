
var tasks = {
    f3k_a: {
        name: "A1",
        description: "L1 5max in 10m",
        ordered: false,     // Target order is important
        lastFlights: 1,     // Number of last flights to count or null
        flights: 0,         // Flights allowed - 0 is unlimited
        targets: [300],     // List of target times that scores will not exceed (order is important if ordered = true)
        threshold: false,   // Are target times required to be reached/exceeded?
        slotLength: 600,    // Length of slot in seconds
    },
    f3k_a2: {
        name: "A2",
        description: "L2 5max in 7m",
        ordered: false,
        lastFlights: 1,
        flights: 0,
        targets: [300],
        threshold: false,
        slotLength: 420,
    },
    f3k_b: {
        name: "B1",
        description: "L2 4max in 10m",
        ordered: false,
        lastFlights: 2,
        flights: 0,
        targets: [240, 240],
        threshold: false,
        slotLength: 600,
    },
    f3k_b2: {
        name: "B2",
        description: "L2 3max in 7m",
        ordered: false,
        lastFlights: 2,
        flights: 0,
        targets: [180, 180],
        threshold: false,
        slotLength: 420,
    },
    f3k_c: {
        name: "C1",
        description: "AllUp 3:00*3",
        ordered: true,
        lastFlights: null,
        flights: 3,
        targets: [180, 180, 180],
        threshold: false,
        slotLength: 0,
    },
    f3k_c2: {
        name: "C2",
        description: "AllUp 3:00*4",
        ordered: true,
        lastFlights: null,
        flights: 4,
        targets: [180, 180, 180, 180],
        threshold: false,
        slotLength: 0,
    },
    f3k_c3: {
        name: "C3",
        description: "AllUp 3:00*5",
        ordered: true,
        lastFlights: null,
        flights: 5,
        targets: [180, 180, 180, 180, 180],
        threshold: false,
        slotLength: 0,
    },
    f3k_d: {
        name: "D", // Ladder
        description: "Ladder",
        ordered: true,
        lastFlights: null,
        flights: 7,
        targets: [30, 45, 60, 75, 90, 105, 120],
        threshold: true,
        slotLength: 600,
    },
    f3k_d2: {
        name: "D1", // 2 Flights 5min max
        description: "2 flights 5max",
        ordered: false,
        lastFlights: null,
        flights: 2,
        targets: [300, 300],
        threshold: false,
        slotLength: 600,
    },
    f3k_e: {
        name: "E", // Poker 5 in 10m
        description: "Poker 5 in 10m",
        ordered: true,
        lastFlights: null,
        flights: 0,
        targets: [0, 0, 0, 0, 0],
        threshold: false,
        slotLength: 600,
    },
    f3k_e2: {
        name: "E1",
        description: "Poker 3 in 10m",
        ordered: true,
        lastFlights: null,
        flights: 0,
        targets: [0, 0, 0],
        threshold: false,
        slotLength: 600,
    },
    f3k_e3: {
        name: "E2",
        description: "Poker 5 in 15m",
        ordered: true,
        lastFlights: null,
        flights: 0,
        targets: [0, 0, 0, 0, 0],
        threshold: false,
        slotLength: 900,
    },
    f3k_f: {
        name: "F",
        description: "Best3 3:00 max",
        ordered: false,
        lastFlights: null,
        flights: 6,
        targets: [180, 180, 180],
        threshold: false,
        slotLength: 600,
    },
    f3k_g: {
        name: "G",
        description: "Best5 2:00 max",
        ordered: false,
        lastFlights: null,
        flights: 0,
        targets: [120, 120, 120, 120, 120],
        threshold: false,
        slotLength: 600,
    },
    f3k_h: {
        name: "H",
        description: "1, 2, 3, 4",
        ordered: false,
        lastFlights: null,
        flights: 0,
        targets: [60, 120, 180, 240],
        threshold: false,
        slotLength: 600,
    },
    f3k_i: {
        name: "I",
        description: "Best3 3:20 max",
        ordered: false,
        lastFlights: null,
        flights: 0,
        targets: [200, 200, 200],
        threshold: false,
        slotLength: 600,
    },
    f3k_j: {
        name: "J",
        description: "L3 3:00max",
        ordered: false,
        lastFlights: 3,
        flights: 0,
        targets: [180, 180, 180],
        threshold: false,
        slotLength: 600,
    },
    f3k_k: {
        name: "K",
        description: "Big Ladder",
        ordered: true,
        lastFlights: null,
        flights: 5,
        targets: [60, 90, 120, 150, 180],
        threshold: false,
        slotLength: 600,
    },
    f3k_l: {
        name: "L",
        description: "1 flight 9:59max",
        ordered: false,
        lastFlights: null,
        flights: 1,
        targets: [599],
        threshold: false,
        slotLength: 600,
    },
    f3k_m: {
        name: "M",
        description: "Huge Ladder",
        ordered: true,
        lastFlights: null,
        flights: 3,
        targets: [180, 300, 420],
        threshold: false,
        slotLength: 900,
    },
}

var taskScorer = {

    taskList: tasks,

    scoreTask: function (rawTimes, taskName) {
        // Take rawTimes (ordered and with landout indicator)
        //rawTimes = [{'time': 120, 'valid': true}, {'time': 65.2, 'valid': true}]

        // Look at length of tagets, ordered etc
        // Return list of scoring (capped) times, ordered including any zeros
        // length should be = length task.targets and also contain cap details for display

        // Do we want to check on number of times vs number of flights allowed?
        // Do we want to check times add up to less than 10minutes? (or whatever)

        let task = tasks[taskName];
        //console.log(taskName, task);
        let results = [];

        if (task.lastFlights) {
            results = rawTimes.slice(-task.lastFlights);
            // Last flights include zeros
            results = results.map((item) => { if (item.valid === true) return item.time; else return 0 });

            while (results.length < task.targets.length) {
                results.unshift(0);
            }
        }

        if (task.ordered) {
            if (task.threshold) { //Ladder
                tmpResults = rawTimes.filter(item => item.valid === true);
                tmpResults = tmpResults.map((item) => item.time);
                tmpTargets = [...task.targets];
                while (tmpResults.length > 0) {
                    //console.log(tmpResults, tmpTargets, task.targets, results);
                    tmpResult = tmpResults.shift();
                    if (tmpResult >= tmpTargets[0]) {
                        results.push(tmpTargets.shift())
                    }
                }
                while (results.length < task.targets.length) {
                    results.push(0);
                }
            }
            else { // Ordered targets
                //console.log("Ordered");
                results = rawTimes.map((item) => { if (item.valid === true) return item.time; else return 0 });
                //console.log(results);
                let excessResults = results.length - task.targets.length;
                if (excessResults > 0) {
                    results = results.slice(0, results.length-excessResults)
                }
                while (results.length < task.targets.length) {
                    results.push(0);
                }
            }
        }
        else { //Targets in any order
            //console.log("Unordered");
            // Remove non-scoring flights
            results = rawTimes.filter(time => time.valid === true);
            results = results.map((item) => item.time);
            results.sort((a, b) => a - b);
            let excessResults = results.length - task.targets.length;
            //console.log(excessResults);
            if (excessResults > 0) {
                // Drop lowest times
                results = results.slice(excessResults, results.length)
            }
            else {
                while (results.length < task.targets.length) {
                    results.unshift(0);
                }
            }
        }

        // Truncate times that exceed targets (redundant if threshold task)
        for (var i = 0; i <= task.targets.length - 1; i += 1) {
            if (task.targets[i] !== 0) results[i] = [Math.min(results[i], task.targets[i]), task.targets[i]]
            else results[i] = [results[i], task.targets[i]];
        }
        return results;
    }
};




export default taskScorer;