import copy

from core.process import Process
from workloads.generator import generate_workload
from schedulers.fcfs import FCFSScheduler
from schedulers.sjf import SJFScheduler
from schedulers.round_robin import RoundRobinScheduler
from schedulers.priority import PriorityScheduler

from core.metrics import (
    average_waiting_time,
    average_turnaround_time,
    throughput,
    context_switch_count
)

processes = generate_workload(
    num_processes=10,
    seed=42
)

print("\nGenerated Workload\n")

for p in processes:
    print(p)

schedulers = {
    "FCFS": FCFSScheduler(),
    "SJF": SJFScheduler(),
    "Round Robin": RoundRobinScheduler(quantum=2),
    "Priority": PriorityScheduler()
}

print("\nScheduler Comparison\n")

print(
    f"{'Algorithm':<15}"
    f"{'Avg WT':<15}"
    f"{'Avg TAT':<15}"
    f"{'Throughput':<15}"
    f"{'Context Switches':<15}"
)

print("-" * 70)
results = []
for name, scheduler in schedulers.items():

    process_copy = copy.deepcopy(processes)

    completed_processes, timeline = scheduler.schedule(process_copy)

    avg_wt = average_waiting_time(completed_processes)

    avg_tat = average_turnaround_time(completed_processes)

    total_time = completed_processes[-1].completion_time

    tp = throughput(completed_processes, total_time)

    cs = context_switch_count(timeline)

    results.append({
    "algorithm": name,
    "avg_wt": avg_wt,
    "avg_tat": avg_tat,
    "throughput": tp,
    "context_switches": cs
})

    print(
        f"{name:<15}"
        f"{avg_wt:<15.2f}"
        f"{avg_tat:<15.2f}"
        f"{tp:<15.2f}"
        f"{cs:<15.2f}"
    )


from visualization.comparison_graphs import plot_comparison_graphs

plot_comparison_graphs(results)