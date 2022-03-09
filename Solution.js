
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function (grid) {
    this.WATER = 0;
    this.LAND = 1;
    this.VISITED = 2;
    this.GRID_HAS_ONLY_LAND_OR_ONLY_WATER = -1;

    this.moves = [[1, 0]/*up*/, [-1, 0]/*down*/, [0, -1]/*left*/, [0, 1]/*right*/];
    this.rows = grid.length;
    this.columns = grid[0].length;

    return multisourceBreadthFirstSearch(grid);
};

/**
 * @param {number} row
 * @param {number} column 
 */
function Point(row, column) {
    this.row = row;
    this.column = column;
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
function multisourceBreadthFirstSearch(grid) {
    const queue = new Queue();
    initializeQueueWithLandPointsOnShoreline(grid, queue);
    if (queue.isEmpty() || queue.size() === this.rows * this.columns) {
        return this.GRID_HAS_ONLY_LAND_OR_ONLY_WATER;
    }

    let maxDistanceFromLand = 0;
    while (!queue.isEmpty()) {

        let pointsInCurrentStep = queue.size();
        while (pointsInCurrentStep-- > 0) {
            const p = queue.dequeue();
            for (let i = 0; i < this.moves.length; i++) {
                let r = p.row + this.moves[i][0];
                let c = p.column + this.moves[i][1];

                if (pointIsInGrid(r, c) && grid[r][c] === this.WATER) {
                    grid[r][c] = this.VISITED;
                    queue.enqueue(new Point(r, c));
                }
            }
        }
        maxDistanceFromLand++;
    }
    return maxDistanceFromLand - 1;
}

/**
 * @param {number[][]} grid
 * @param {Queue of Point Objects} queue
 */
function initializeQueueWithLandPointsOnShoreline(grid, queue) {
    for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
            if (grid[r][c] === this.LAND && hasAdjacentWaterPoint(grid, r, c)) {
                queue.enqueue(new Point(r, c));
            }
        }
    }
}

/**
 * @param {number} r
 * @param {number} c 
 * @return {boolean}
 */
function pointIsInGrid(r, c) {
    return r >= 0 && r < this.rows && c >= 0 && c < this.columns;
}


/**
 * @param {number[][]} grid
 * @param {number} row
 * @param {number} column 
 * @return {boolean}
 */
function hasAdjacentWaterPoint(grid, row, column) {
    for (let i = 0; i < this.moves.length; i++) {
        let r = row + this.moves[i][0];
        let c = column + this.moves[i][1];
        if (pointIsInGrid(r, c) && grid[r][c] === this.WATER) {
            return true;
        }
    }
    return false;
}
