import sys

# A simple implementation of Priority Queue
# using Queue.
class PriorityQueue(object):
    def __init__(self):
        self.queue = []
  
    def __str__(self):
        return ' '.join([str(i) for i in self.queue])
  
    # for checking if the queue is empty
    def isEmpty(self):
        return len(self.queue) == 0
  
    # for inserting an element in the queue
    def insert(self, data):
        self.queue.append(data)
  
    # for popping an element based on Priority
    def delete(self):
        try:
            max = 0
            for i in range(len(self.queue)):
                if self.queue[i]['weight'] > self.queue[max]['weight']:
                    max = i
            item = self.queue[max]
            del self.queue[max]
            return item
        except IndexError:
            print()
            exit()

def part1_old(input):
    input = [[int(numStr) for numStr in line.strip()] for line in input]
    path_weights = []
    
    def fill_path_weights(grid, current_path, current_weight, recurse_count):
        if (current_path[-1] == [len(grid)-1, len(grid[0])-1]):
            path_weights.append(current_weight)
            return

        if current_path[-1][1]+1 <= len(grid[0])-1:
            new_current_path_0 = current_path.copy()
            new_current_path_0.append([current_path[-1][0], current_path[-1][1]+1])
            new_weight_0 = current_weight + grid[current_path[-1][0]][current_path[-1][1]+1]
            fill_path_weights(grid, new_current_path_0, new_weight_0, recurse_count + 1)
        if current_path[-1][0]+1 <= len(grid)-1:
            new_current_path_1 = current_path.copy()
            new_current_path_1.append([current_path[-1][0]+1, current_path[-1][1]])
            new_weight_1 = current_weight + grid[current_path[-1][0]+1][current_path[-1][1]]
            fill_path_weights(grid, new_current_path_1, new_weight_1, recurse_count + 1)

    fill_path_weights(input, [[0, 0]], 0, 1)
    
    return min(path_weights)

# https://stackoverflow.com/questions/30409493/using-bfs-for-weighted-graphs
def part1(input):
    heap = PriorityQueue()
    heap.insert({
        "position": [0, 0],
        "weight": 0
    })

    dist = {}
    for i in range(0, len(input)):
        for j in range(0, len(input[0])):
            dist[str(i) + '-' + str(j)] = sys.maxsize
    dist['0-0'] = 0

    while not heap.isEmpty():
        point = heap.delete()


        curr_dist_key = str(point['position'][0]) + '-' + str(point['position'][1])

        if point['position'][1]+1 < len(input):
            next_dist_key = str(point['position'][0]) + '-' + str(point['position'][1]+1)
            if dist[next_dist_key] > dist[curr_dist_key] + point['weight']:
                dist[next_dist_key] = dist[curr_dist_key] + point['weight']
                heap.insert({
                    'position': [point['position'][0], point['position'][1]+1],
                    'weight': dist[next_dist_key]
                })

        if point['position'][0]+1 < len(input[0]):
            next_dist_key = str(point['position'][0]+1) + '-' + str(point['position'][1])
            if dist[next_dist_key] > dist[curr_dist_key] + point['weight']:
                dist[next_dist_key] = dist[curr_dist_key] + point['weight']
                heap.insert({
                    'position': [point['position'][0], point['position'][1]+1],
                    'weight': dist[next_dist_key]
                })

    return dist[str(len(input)-1) + '-' + str(len(input[0])-1)]


def part2(input):
    return len(input)
