class SRTFScheduler:

    def schedule(self, processes):

        current_time = 0

        completed = 0

        n = len(processes)

        timeline = []

        ready_queue = []

        while completed < n:

            for process in processes:

                if (
                    process.arrival_time == current_time
                    and process not in ready_queue
                    and process.remaining_time > 0
                ):

                    ready_queue.append(process)

            if len(ready_queue) == 0:

                current_time += 1

                continue

            ready_queue.sort(
                key=lambda p: p.remaining_time
            )

            current_process = ready_queue[0]

            start_time = current_time

            current_process.remaining_time -= 1

            current_time += 1

            timeline.append(
                (
                    current_process.pid,
                    start_time,
                    current_time
                )
            )

            if current_process.remaining_time == 0:

                current_process.completion_time = (
                    current_time
                )

                current_process.turnaround_time = (
                    current_process.completion_time
                    - current_process.arrival_time
                )

                current_process.waiting_time = (
                    current_process.turnaround_time
                    - current_process.burst_time
                )

                ready_queue.remove(
                    current_process
                )

                completed += 1

        return processes, timeline