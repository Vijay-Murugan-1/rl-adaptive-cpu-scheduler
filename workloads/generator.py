import random

from core.process import Process

def generate_workload(
    num_processes,
    max_arrival_time=20,
    max_burst_time=10,
    max_priority=5,
    seed=None
):
    if seed is not None:
        random.seed(seed)

    processes = []

    for pid in range(1, num_processes + 1):

        arrival_time = random.randint(
            0,
            max_arrival_time
        )

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