from stable_baselines3 import PPO

from rl_environment.preemptive_scheduler_env import (
    PreemptiveCPUSchedulerEnv
)

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

print("\nCompleted Processes:")
print(len(env.get_completed_processes()))

print("\nTimeline Length:")
print(len(env.get_timeline()))

print("\nTotal PPO Reward:")
print(total_reward)