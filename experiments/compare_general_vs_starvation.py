from stable_baselines3 import PPO

from rl_environment.scheduler_env import (
    CPUSchedulerEnv
)

from core.metrics import (
    average_waiting_time,
    average_turnaround_time
)

starvation_model = PPO.load(
    "ppo_cpu_scheduler"
)

general_model = PPO.load(
    "ppo_cpu_scheduler_general"
)

workloads = [
    "normal",
    "cpu_bound",
    "io_bound",
    "starvation",
    "mixed"
]

print("\nGeneral PPO vs Starvation PPO\n")

print(
    f"{'Workload':<15}"
    f"{'Starv WT':<12}"
    f"{'General WT':<12}"
    f"{'Starv TAT':<12}"
    f"{'General TAT':<12}"
)

print("-" * 65)

for workload in workloads:

    # ------------------------
    # Starvation PPO
    # ------------------------

    env = CPUSchedulerEnv(
        num_processes=10,
        workload_type=workload
    )

    state, info = env.reset()

    done = False

    while not done:

        action, _ = starvation_model.predict(
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

    starv_wt = average_waiting_time(
        completed_processes
    )

    starv_tat = average_turnaround_time(
        completed_processes
    )

    # ------------------------
    # General PPO
    # ------------------------

    env = CPUSchedulerEnv(
        num_processes=10,
        workload_type=workload
    )

    state, info = env.reset()

    done = False

    while not done:

        action, _ = general_model.predict(
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

    general_wt = average_waiting_time(
        completed_processes
    )

    general_tat = average_turnaround_time(
        completed_processes
    )

    print(
        f"{workload:<15}"
        f"{starv_wt:<12.2f}"
        f"{general_wt:<12.2f}"
        f"{starv_tat:<12.2f}"
        f"{general_tat:<12.2f}"
    )