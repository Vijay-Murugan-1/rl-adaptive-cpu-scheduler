from collections import deque


class RoundRobinScheduler:

    def __init__(self, quantum=2):

        self.quantum = quantum

    def schedule(self, processes):

        processes = sorted(
            processes,
            key=lambda p: p.arrival_time
        )

        ready_queue = deque()

        completed = []

        timeline = []

        current_time = 0

        index = 0

        n = len(processes)

        while ready_queue or index < n:

            # Add arrived processes
            while (
                index < n and
                processes[index].arrival_time <= current_time
            ):

                ready_queue.append(processes[index])

                index += 1

            # If queue empty, move time
            if not ready_queue:

                current_time += 1

                continue

            process = ready_queue.popleft()

            start_time = current_time

            execution_time = min(
                self.quantum,
                process.remaining_time
            )

            current_time += execution_time

            process.remaining_time -= execution_time

            end_time = current_time

            timeline.append(
                (process.pid, start_time, end_time)
            )

            # Add newly arrived processes during execution
            while (
                index < n and
                processes[index].arrival_time <= current_time
            ):

                ready_queue.append(processes[index])

                index += 1

            # If process completed
            if process.remaining_time == 0:

                process.completion_time = current_time

                process.turnaround_time = (
                    process.completion_time
                    - process.arrival_time
                )

                process.waiting_time = (
                    process.turnaround_time
                    - process.burst_time
                )

                completed.append(process)

            else:
                # Put back into queue
                ready_queue.append(process)

        return completed, timeline