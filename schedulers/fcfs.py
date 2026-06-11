class FCFSScheduler:

    def schedule(self, processes):

        processes.sort(key=lambda p: p.arrival_time)

        current_time = 0

        timeline = []

        for process in processes:

            if current_time < process.arrival_time:
                current_time = process.arrival_time

            start_time = current_time

            current_time += process.burst_time

            end_time = current_time

            # Store execution timeline
            timeline.append(
                (process.pid, start_time, end_time)
            )

            process.completion_time = current_time

            process.turnaround_time = (
                process.completion_time - process.arrival_time
            )

            process.waiting_time = (
                process.turnaround_time - process.burst_time
            )

        return processes, timeline