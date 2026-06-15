def average_waiting_time(processes):

    total_waiting_time = sum(p.waiting_time for p in processes)

    return total_waiting_time / len(processes)


def average_turnaround_time(processes):

    total_turnaround_time = sum(
        p.turnaround_time for p in processes
    )

    return total_turnaround_time / len(processes)


def throughput(processes, total_time):

    return len(processes) / total_time

def context_switch_count(timeline):

    if len(timeline) <= 1:
        return 0

    return len(timeline) - 1

def max_waiting_time(processes):

    return max(
        p.waiting_time
        for p in processes
    )
def average_age(processes):

    return sum(
        p.age
        for p in processes
    ) / len(processes)

def starvation_count(
    processes,
    threshold=20
):

    return sum(
        1
        for p in processes
        if p.waiting_time > threshold
    )

def fairness_index(processes):

    waiting_times = [
        p.waiting_time
        for p in processes
    ]

    if len(waiting_times) == 0:

        return 0

    numerator = (
        sum(waiting_times) ** 2
    )

    denominator = (
        len(waiting_times)
        *
        sum(
            wt ** 2
            for wt in waiting_times
        )
    )

    if denominator == 0:

        return 1

    return numerator / denominator