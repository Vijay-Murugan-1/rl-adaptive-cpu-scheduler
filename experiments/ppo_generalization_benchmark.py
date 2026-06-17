from stable_baselines3 import PPO

from rl_environment.scheduler_env import (
    CPUSchedulerEnv
)

from core.metrics import (
    average_waiting_time,
    average_turnaround_time
)

model = PPO.load(
    "ppo_cpu_scheduler_general"
)

workloads = [
    "normal",
    "cpu_bound",
    "io_bound",
    "starvation",
    "mixed"
]

results = []

for workload in workloads:

    env = CPUSchedulerEnv(
        num_processes=10,
        workload_type=workload
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

    completed_processes = (
        env.get_completed_processes()
    )

    avg_wt = average_waiting_time(
        completed_processes
    )

    avg_tat = average_turnaround_time(
        completed_processes
    )

    results.append({
        "workload": workload,
        "avg_wt": round(avg_wt, 2),
        "avg_tat": round(avg_tat, 2),
        "reward": round(total_reward, 2)
    })

print("\nPPO Generalization Benchmark\n")

print(
    f"{'Workload':<15}"
    f"{'Avg WT':<12}"
    f"{'Avg TAT':<12}"
    f"{'Reward':<12}"
)

print("-" * 55)

for result in results:

    print(
        f"{result['workload']:<15}"
        f"{result['avg_wt']:<12}"
        f"{result['avg_tat']:<12}"
        f"{result['reward']:<12}"
    )