from stable_baselines3 import PPO

from rl_environment.scheduler_env import CPUSchedulerEnv


env = CPUSchedulerEnv(
    num_processes=5
)

model = PPO.load(
    "ppo_cpu_scheduler"
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

print(
    "Total PPO Reward:",
    total_reward
)