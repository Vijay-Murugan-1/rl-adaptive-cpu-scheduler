from core.process import Process
from schedulers.fcfs import FCFSScheduler
from visualization.gantt_chart import plot_gantt_chart
from schedulers.sjf import SJFScheduler
from schedulers.round_robin import RoundRobinScheduler
from schedulers.priority import PriorityScheduler
from core.metrics import (
    average_waiting_time,
    average_turnaround_time,
    throughput
)

processes = [
    Process(1, 0, 5, 2),
    Process(2, 0, 3, 1),
    Process(3, 0, 2, 3)
]


scheduler = PriorityScheduler()

completed_processes, timeline = scheduler.schedule(processes)


#print("\nFCFS Scheduling Results\n")
print("\nPriority Scheduling Results\n")
print("PID\tAT\tBT\tCT\tTAT\tWT")

for p in completed_processes:

    print(
        f"{p.pid}\t"
        f"{p.arrival_time}\t"
        f"{p.burst_time}\t"
        f"{p.completion_time}\t"
        f"{p.turnaround_time}\t"
        f"{p.waiting_time}"
    )
avg_wt = average_waiting_time(completed_processes)

avg_tat = average_turnaround_time(completed_processes)

total_time = completed_processes[-1].completion_time

tp = throughput(completed_processes, total_time)


print("\nPerformance Metrics")

print(f"Average Waiting Time: {avg_wt:.2f}")

print(f"Average Turnaround Time: {avg_tat:.2f}")

print(f"Throughput: {tp:.2f}")

plot_gantt_chart(timeline)


#Temporary Test
from workloads.generator import generate_workload

processes = generate_workload(5)

for p in processes:
    print(p)