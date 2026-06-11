class SJFScheduler:

    def schedule(self, processes):

        processes = sorted(
            processes,
            key=lambda p: p.arrival_time
        )

        completed = []
        timeline = []

        current_time = 0

        ready_queue = []

        while processes or ready_queue:

            # Add arrived processes to ready queue
            while processes and (
                processes[0].arrival_time <= current_time
            ):

                ready_queue.append(processes.pop(0))

            # If no process available, move time forward
            if not ready_queue:
                current_time += 1
                continue

            # Select shortest burst time process
            ready_queue.sort(key=lambda p: p.burst_time)

            process = ready_queue.pop(0)

            start_time = current_time

            current_time += process.burst_time

            end_time = current_time

            timeline.append(
                (process.pid, start_time, end_time)
            )

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

        return completed, timeline