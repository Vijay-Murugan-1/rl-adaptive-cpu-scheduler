import copy

from stable_baselines3 import PPO

from workloads.generator import generate_workload

from schedulers.srtf import SRTFScheduler

from rl_environment.preemptive_scheduler_env import (
    PreemptiveCPUSchedulerEnv
)

from core.metrics import (
    average_waiting_time,
    average_turnaround_time,
    max_waiting_time,
    context_switch_count
)

# ==========================
# Generate Workload
# ==========================

processes = generate_workload(
    num_processes=10,
    seed=42,
    workload_type="starvation"
)

results = []

# ==========================
# SRTF
# ==========================

srtf = SRTFScheduler()

completed_processes, timeline = srtf.schedule(
    copy.deepcopy(processes)
)

results.append({
    "algorithm": "SRTF",
    "avg_wt": round(
        average_waiting_time(completed_processes),
        2
    ),
    "max_wt": round(
        max_waiting_time(completed_processes),
        2
    ),
    "avg_tat": round(
        average_turnaround_time(completed_processes),
        2
    ),
    "ctx": context_switch_count(timeline)
})

# ==========================
# PPO
# ==========================

model = PPO.load(
    "ppo_preemptive_scheduler"
)

env = PreemptiveCPUSchedulerEnv(
    num_processes=10
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

results.append({
    "algorithm": "PPO",
    "avg_wt": round(
        average_waiting_time(completed_processes),
        2
    ),
    "max_wt": round(
        max_waiting_time(completed_processes),
        2
    ),
    "avg_tat": round(
        average_turnaround_time(completed_processes),
        2
    ),
    "ctx": context_switch_count(timeline)
})

# ==========================
# Print Results
# ==========================

print("\nPreemptive PPO vs SRTF\n")

print(
    f"{'Algorithm':<12}"
    f"{'Avg WT':<12}"
    f"{'Max WT':<12}"
    f"{'Avg TAT':<12}"
    f"{'Ctx Sw':<12}"
)

print("-" * 60)

for result in results:

    print(
        f"{result['algorithm']:<12}"
        f"{result['avg_wt']:<12}"
        f"{result['max_wt']:<12}"
        f"{result['avg_tat']:<12}"
        f"{result['ctx']:<12}"
    )

print("\nPPO Reward:", total_reward)