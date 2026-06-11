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