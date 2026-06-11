import copy

from stable_baselines3 import PPO

from core.metrics import (
    average_waiting_time,
    average_turnaround_time,
    throughput,
    context_switch_count
)

from workloads.generator import generate_workload

from schedulers.fcfs import FCFSScheduler
from schedulers.sjf import SJFScheduler
from schedulers.round_robin import RoundRobinScheduler
from schedulers.priority import PriorityScheduler

from rl_environment.scheduler_env import CPUSchedulerEnv


# Generate workload for classical schedulers
processes = generate_workload(
    num_processes=10,
    seed=42
)

# Classical schedulers
schedulers = {
    "FCFS": FCFSScheduler(),
    "SJF": SJFScheduler(),
    "Round Robin": RoundRobinScheduler(quantum=2),
    "Priority": PriorityScheduler()
}

results = []

# ==========================
# Classical Scheduler Results
# ==========================

for name, scheduler in schedulers.items():

    process_copy = copy.deepcopy(processes)

    completed_processes, timeline = scheduler.schedule(
        process_copy
    )

    avg_wt = average_waiting_time(
        completed_processes
    )

    avg_tat = average_turnaround_time(
        completed_processes
    )

    total_time = completed_processes[-1].completion_time

    tp = throughput(
        completed_processes,
        total_time
    )

    cs = context_switch_count(
        timeline
    )

    results.append({
        "algorithm": name,
        "avg_wt": round(avg_wt, 2),
        "avg_tat": round(avg_tat, 2),
        "throughput": round(tp, 2),
        "context_switches": cs
    })

# ==========================
# PPO Evaluation
# ==========================

model = PPO.load(
    "ppo_cpu_scheduler"
)

env = CPUSchedulerEnv(
    num_processes=5
)

state, info = env.reset()

done = False

total_reward = 0

while not done:

    action, _ = model.predict(
        state,
        deterministic=True
    )

    state, reward, terminated, truncated, info = env.step(
        action
    )

    total_reward += reward

    done = terminated or truncated

completed_processes = env.get_completed_processes()

timeline = env.get_timeline()

avg_wt = average_waiting_time(
    completed_processes
)

avg_tat = average_turnaround_time(
    completed_processes
)

total_time = completed_processes[-1].completion_time

tp = throughput(
    completed_processes,
    total_time
)

cs = context_switch_count(
    timeline
)

results.append({
    "algorithm": "PPO",
    "avg_wt": round(avg_wt, 2),
    "avg_tat": round(avg_tat, 2),
    "throughput": round(tp, 2),
    "context_switches": cs,
    "reward": total_reward
})

# ==========================
# Print Results
# ==========================

print("\nRL vs Classical Comparison\n")

print(
    f"{'Algorithm':<15}"
    f"{'Avg WT':<12}"
    f"{'Avg TAT':<12}"
    f"{'Throughput':<12}"
    f"{'Context Sw':<12}"
)

print("-" * 65)

for result in results:

    print(
        f"{result['algorithm']:<15}"
        f"{result.get('avg_wt', '-'): <12}"
        f"{result.get('avg_tat', '-'): <12}"
        f"{result.get('throughput', '-'): <12}"
        f"{result.get('context_switches', '-'): <12}"
    )

print("\nPPO Total Reward:", total_reward)