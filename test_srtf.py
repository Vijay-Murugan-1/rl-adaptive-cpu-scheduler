from workloads.generator import generate_workload

from schedulers.srtf import SRTFScheduler

processes = generate_workload(
    num_processes=10,
    seed=42,
    workload_type="starvation"
)

scheduler = SRTFScheduler()

completed_processes, timeline = scheduler.schedule(
    processes
)

print("\nCompleted Processes")

for p in completed_processes:

    print(
        p.pid,
        p.waiting_time,
        p.turnaround_time
    )

print("\nTimeline Length:")

print(
    len(timeline)
)