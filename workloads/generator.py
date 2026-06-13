import random

from core.process import Process


def generate_workload(
    num_processes,
    max_arrival_time=20,
    max_burst_time=10,
    max_priority=5,
    seed=None,
    workload_type="normal"
):

    if seed is not None:
        random.seed(seed)

    processes = []

    for pid in range(1, num_processes + 1):

        arrival_time = random.randint(
            0,
            max_arrival_time
        )

        # =====================
        # NORMAL
        # =====================

        if workload_type == "normal":

            burst_time = random.randint(
                1,
                max_burst_time
            )

        # =====================
        # CPU-BOUND
        # Long jobs dominate
        # =====================

        elif workload_type == "cpu_bound":

            burst_time = random.randint(
                max_burst_time // 2,
                max_burst_time
            )

        # =====================
        # IO-BOUND
        # Mostly short jobs
        # =====================

        elif workload_type == "io_bound":

            burst_time = random.randint(
                1,
                max(2, max_burst_time // 4)
            )

        # =====================
        # STARVATION
        # Few huge jobs + many tiny jobs
        # =====================

        elif workload_type == "starvation":

            if pid <= 7:

                burst_time = 1

            elif pid == 8:

                burst_time = 20

            elif pid == 9:

                burst_time = 25

            else:

                burst_time = 30

        # =====================
        # MIXED
        # Random combination
        # =====================

        elif workload_type == "mixed":

            if random.random() < 0.5:

                burst_time = random.randint(
                    1,
                    3
                )

            else:

                burst_time = random.randint(
                    8,
                    max_burst_time
                )

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