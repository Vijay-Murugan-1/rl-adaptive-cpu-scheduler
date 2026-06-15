from workloads.generator import generate_workload

from schedulers.sjf import SJFScheduler

from core.metrics import (
    fairness_index,
    starvation_count
)

processes = generate_workload(
    num_processes=10,
    seed=42,
    workload_type="starvation"
)

scheduler = SJFScheduler()

completed_processes, timeline = (
    scheduler.schedule(processes)
)

print(
    "Fairness:",
    fairness_index(
        completed_processes
    )
)

print(
    "Starved:",
    starvation_count(
        completed_processes
    )
)