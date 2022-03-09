
#include <array>
#include <queue>
#include <vector>
using namespace std;

class Solution {

    static const struct Point {
        int row;
        int column;
        Point(int row, int column) : row(row), column(column) {}
    };

    inline static const int WATER = 0;
    inline static const int LAND = 1;
    inline static const int VISITED = 2;
    inline static const int GRID_HAS_ONLY_LAND_OR_ONLY_WATER = -1;
    inline static const array<array<int, 2>, 4> moves{array<int, 2> {1, 0}/*up*/, {-1, 0}/*down*/, {0, -1}/*left*/, {0, 1}/*right*/};
    size_t rows;
    size_t columns;

public:
    int maxDistance(vector<vector<int>>& grid) {
        rows = grid.size();
        columns = grid[0].size();
        return multisourceBreadthFirstSearch(grid);
    }

private:
    int multisourceBreadthFirstSearch(vector<vector<int>>& grid) {
        queue<Point> queue;
        initializeQueueWithLandPointsOnShoreline(grid, queue);
        if (queue.empty() || queue.size() == rows * columns) {
            return GRID_HAS_ONLY_LAND_OR_ONLY_WATER;
        }

        int maxDistanceFromLand = 0;
        while (!queue.empty()) {

            int pointsInCurrentStep = queue.size();
            while (pointsInCurrentStep-- > 0) {
                Point p = queue.front();
                queue.pop();
                for (int i = 0; i < moves.size(); i++) {
                    int r = p.row + moves[i][0];
                    int c = p.column + moves[i][1];

                    if (pointIsInGrid(r, c) && grid[r][c] == WATER) {
                        grid[r][c] = VISITED;
                        queue.push(Point(r, c));
                    }
                }
            }
            maxDistanceFromLand++;
        }
        return maxDistanceFromLand - 1;
    }

    void initializeQueueWithLandPointsOnShoreline(const vector<vector<int>>& grid, queue<Point>& queue) {
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < columns; c++) {
                if (grid[r][c] == LAND && hasAdjacentWaterPoint(grid, r, c)) {
                    queue.push(Point(r, c));
                }
            }
        }
    }

    bool pointIsInGrid(int r, int c) {
        return r >= 0 && r < rows && c >= 0 && c < columns;
    }

    bool hasAdjacentWaterPoint(const vector<vector<int>>& grid, int row, int column) {
        for (int i = 0; i < moves.size(); i++) {
            int r = row + moves[i][0];
            int c = column + moves[i][1];
            if (pointIsInGrid(r, c) && grid[r][c] == WATER) {
                return true;
            }
        }
        return false;
    }
};
