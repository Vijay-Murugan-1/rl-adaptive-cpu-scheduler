import copy
import statistics

from stable_baselines3 import PPO

from workloads.generator import generate_workload

from schedulers.sjf import SJFScheduler

from core.metrics import (
    average_waiting_time,
    average_turnaround_time
)

from rl_environment.scheduler_env import (
    CPUSchedulerEnv
)


model = PPO.load(
    "ppo_cpu_scheduler_general"
)

seeds = [
    42,
    100,
    200,
    500,
    1000
]

workloads = [
    "normal",
    "cpu_bound",
    "io_bound",
    "starvation",
    "mixed"
]

print("\nMULTI-SEED EVALUATION\n")

for workload in workloads:

    sjf_wt_results = []
    sjf_tat_results = []

    ppo_wt_results = []
    ppo_tat_results = []

    for seed in seeds:

        # -------------------------
        # SJF
        # -------------------------

        processes = generate_workload(
            num_processes=10,
            seed=seed,
            workload_type=workload
        )

        scheduler = SJFScheduler()

        completed_processes, timeline = (
            scheduler.schedule(
                copy.deepcopy(processes)
            )
        )

        sjf_wt_results.append(
            average_waiting_time(
                completed_processes
            )
        )

        sjf_tat_results.append(
            average_turnaround_time(
                completed_processes
            )
        )

        # -------------------------
        # PPO
        # -------------------------

        env = CPUSchedulerEnv(
            num_processes=10,
            workload_type=workload
        )

        env.processes = generate_workload(
            num_processes=10,
            seed=seed,
            workload_type=workload
        )

        env.current_time = 0
        env.timeline = []
        env.completed_processes = []
        env.ready_queue = []

        env.future_processes = sorted(
            env.processes,
            key=lambda p: p.arrival_time
        )

        env.update_ready_queue()

        state = env.get_state()

        done = False

        while not done:

            action, _ = model.predict(
                state,
                deterministic=True
            )

            state, reward, terminated, truncated, info = (
                env.step(action)
            )

            done = terminated or truncated

        completed_processes = (
            env.get_completed_processes()
        )

        ppo_wt_results.append(
            average_waiting_time(
                completed_processes
            )
        )

        ppo_tat_results.append(
            average_turnaround_time(
                completed_processes
            )
        )

    print(
        "\n"
        + "=" * 80
    )

    print(
        f"WORKLOAD: {workload.upper()}"
    )

    print(
        "=" * 80
    )

    print(
        f"{'Algorithm':<12}"
        f"{'Mean WT':<12}"
        f"{'Std WT':<12}"
        f"{'Mean TAT':<12}"
        f"{'Std TAT':<12}"
    )

    print("-" * 60)

    print(
        f"{'SJF':<12}"
        f"{statistics.mean(sjf_wt_results):<12.2f}"
        f"{statistics.stdev(sjf_wt_results):<12.2f}"
        f"{statistics.mean(sjf_tat_results):<12.2f}"
        f"{statistics.stdev(sjf_tat_results):<12.2f}"
    )

    print(
        f"{'PPO':<12}"
        f"{statistics.mean(ppo_wt_results):<12.2f}"
        f"{statistics.stdev(ppo_wt_results):<12.2f}"
        f"{statistics.mean(ppo_tat_results):<12.2f}"
        f"{statistics.stdev(ppo_tat_results):<12.2f}"
    )