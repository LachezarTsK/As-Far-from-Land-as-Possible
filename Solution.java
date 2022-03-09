
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    private static final class Point {
        int row;
        int column;

        public Point(int row, int column) {
            this.row = row;
            this.column = column;
        }
    }

    private static final int WATER = 0;
    private static final int LAND = 1;
    private static final int VISITED = 2;
    private static final int GRID_HAS_ONLY_LAND_OR_ONLY_WATER = -1;
    private static final int[][] moves = {{1, 0}/*up*/, {-1, 0}/*down*/, {0, -1}/*left*/, {0, 1}/*right*/};
    private int rows;
    private int columns;

    public int maxDistance(int[][] grid) {
        rows = grid.length;
        columns = grid[0].length;
        return multisourceBreadthFirstSearch(grid);
    }

    private int multisourceBreadthFirstSearch(int[][] grid) {
        Queue<Point> queue = new LinkedList<>();
        initializeQueueWithLandPointsOnShoreline(grid, queue);
        if (queue.isEmpty() || queue.size() == rows * columns) {
            return GRID_HAS_ONLY_LAND_OR_ONLY_WATER;
        }

        int maxDistanceFromLand = 0;
        while (!queue.isEmpty()) {

            int pointsInCurrentStep = queue.size();
            while (pointsInCurrentStep-- > 0) {
                Point p = queue.poll();
                for (int i = 0; i < moves.length; i++) {
                    int r = p.row + moves[i][0];
                    int c = p.column + moves[i][1];

                    if (pointIsInGrid(r, c) && grid[r][c] == WATER) {
                        grid[r][c] = VISITED;
                        queue.add(new Point(r, c));
                    }
                }
            }
            maxDistanceFromLand++;
        }
        return maxDistanceFromLand - 1;
    }

    private void initializeQueueWithLandPointsOnShoreline(int[][] grid, Queue<Point> queue) {
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < columns; c++) {
                if (grid[r][c] == LAND && hasAdjacentWaterPoint(grid, r, c)) {
                    queue.add(new Point(r, c));
                }
            }
        }
    }

    private boolean pointIsInGrid(int r, int c) {
        return r >= 0 && r < rows && c >= 0 && c < columns;
    }

    private boolean hasAdjacentWaterPoint(int[][] grid, int row, int column) {
        for (int i = 0; i < moves.length; i++) {
            int r = row + moves[i][0];
            int c = column + moves[i][1];
            if (pointIsInGrid(r, c) && grid[r][c] == WATER) {
                return true;
            }
        }
        return false;
    }
}
