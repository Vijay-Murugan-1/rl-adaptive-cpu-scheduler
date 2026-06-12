print("TEST FILE STARTED")
try:
    from rl_environment.preemptive_scheduler_env import (
        PreemptiveCPUSchedulerEnv
    )

    env = PreemptiveCPUSchedulerEnv(
        num_processes=10
    )

    state, info = env.reset()

    print("Initial State:")
    print(state)

    for step in range(15):

        action = 0

        state, reward, terminated, truncated, info = env.step(
            action
        )

        print(f"\nStep {step + 1}")

        print("State:")
        print(state)

        print("Reward:")
        print(reward)

        print("Completed:")
        print(len(env.completed_processes))

        if terminated:
            break
except Exception as e:
    print(f"An error occurred: {e}")