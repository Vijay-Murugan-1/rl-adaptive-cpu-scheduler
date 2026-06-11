import random

from core.process import Process


def generate_workload(
    num_processes,
    max_arrival_time=20,
    max_burst_time=10,
    max_priority=5,
    seed=None,
    workload_type="random"
):

    if seed is not None:
        random.seed(seed)

    processes = []

    starvation_bursts = [
        1, 1, 1, 1, 1,
        1, 1,
        20, 25, 30
    ]

    bursty_bursts = [
        2, 3, 2, 4,
        15, 18,
        1, 2,
        25, 30
    ]

    for pid in range(1, num_processes + 1):

        arrival_time = random.randint(
            0,
            max_arrival_time
        )

        if workload_type == "starvation":

            burst_time = starvation_bursts[
                (pid - 1) % len(starvation_bursts)
            ]

        elif workload_type == "bursty":

            burst_time = bursty_bursts[
                (pid - 1) % len(bursty_bursts)
            ]

        else:

            burst_time = random.randint(
                1,
                max_burst_time
            )

        priority = random.randint(
            1,
            max_priority
        )

        process = Process(
            pid,
            arrival_time,
            burst_time,
            priority
        )

        processes.append(process)

    return processes