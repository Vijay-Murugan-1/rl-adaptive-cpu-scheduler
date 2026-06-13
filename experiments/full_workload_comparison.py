import copy

from stable_baselines3 import PPO

from workloads.generator import generate_workload

from schedulers.fcfs import FCFSScheduler
from schedulers.sjf import SJFScheduler
from schedulers.round_robin import RoundRobinScheduler
from schedulers.priority import PriorityScheduler

from rl_environment.scheduler_env import (
    CPUSchedulerEnv
)

from core.metrics import (
    average_waiting_time,
    average_turnaround_time
)

model = PPO.load(
    "ppo_cpu_scheduler"
)

workloads = [
    "normal",
    "cpu_bound",
    "io_bound",
    "starvation",
    "mixed"
]

schedulers = {
    "FCFS": FCFSScheduler(),
    "SJF": SJFScheduler(),
    "Round Robin": RoundRobinScheduler(
        quantum=2
    ),
    "Priority": PriorityScheduler()
}

for workload in workloads:

    print("\n")
    print("=" * 90)
    print(
        f"WORKLOAD: {workload.upper()}"
    )
    print("=" * 90)

    print(
        f"{'Algorithm':<15}"
        f"{'Avg WT':<12}"
        f"{'Avg TAT':<12}"
    )

    print("-" * 40)

    processes = generate_workload(
        num_processes=10,
        seed=42,
        workload_type=workload
    )

    # Classical Schedulers

    for name, scheduler in schedulers.items():

        process_copy = copy.deepcopy(
            processes
        )

        completed_processes, timeline = (
            scheduler.schedule(
                process_copy
            )
        )

        avg_wt = average_waiting_time(
            completed_processes
        )

        avg_tat = average_turnaround_time(
            completed_processes
        )

        print(
            f"{name:<15}"
            f"{avg_wt:<12.2f}"
            f"{avg_tat:<12.2f}"
        )

    # PPO Scheduler

    env = CPUSchedulerEnv(
        num_processes=10,
        workload_type=workload
    )

    state, info = env.reset()

    done = False

    while not done:

        action, _ = model.predict(
            state,
            deterministic=True
        )

        state, reward, terminated, truncated, info = env.step(
            action
        )

        done = terminated or truncated

    completed_processes = (
        env.get_completed_processes()
    )

    avg_wt = average_waiting_time(
        completed_processes
    )

    avg_tat = average_turnaround_time(
        completed_processes
    )

    print(
        f"{'PPO':<15}"
        f"{avg_wt:<12.2f}"
        f"{avg_tat:<12.2f}"
    )