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
    max_waiting_time,
    fairness_index,
    starvation_count
)

model = PPO.load(
    "ppo_cpu_scheduler_general"
)

processes = generate_workload(
    num_processes=10,
    seed=42,
    workload_type="starvation"
)

schedulers = {
    "FCFS": FCFSScheduler(),
    "SJF": SJFScheduler(),
    "Round Robin": RoundRobinScheduler(
        quantum=2
    ),
    "Priority": PriorityScheduler()
}

print("\nFairness Comparison\n")

print(
    f"{'Algorithm':<15}"
    f"{'Avg WT':<12}"
    f"{'Max WT':<12}"
    f"{'Fairness':<12}"
    f"{'Starved':<12}"
)

print("-" * 65)

# Classical schedulers

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

    max_wt = max_waiting_time(
        completed_processes
    )

    fairness = fairness_index(
        completed_processes
    )

    starved = starvation_count(
        completed_processes
    )

    print(
        f"{name:<15}"
        f"{avg_wt:<12.2f}"
        f"{max_wt:<12.2f}"
        f"{fairness:<12.3f}"
        f"{starved:<12}"
    )

# PPO General

env = CPUSchedulerEnv(
    num_processes=10,
    workload_type="starvation"
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

max_wt = max_waiting_time(
    completed_processes
)

fairness = fairness_index(
    completed_processes
)

starved = starvation_count(
    completed_processes
)

print(
    f"{'PPO-General':<15}"
    f"{avg_wt:<12.2f}"
    f"{max_wt:<12.2f}"
    f"{fairness:<12.3f}"
    f"{starved:<12}"
)