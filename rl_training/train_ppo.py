from stable_baselines3 import PPO

from rl_environment.scheduler_env import CPUSchedulerEnv


print("Creating Environment...")

env = CPUSchedulerEnv(
    num_processes=10
)

print("Creating PPO Model...")

model = PPO(
    "MlpPolicy",
    env,
    verbose=1
)

print("Starting Training...")

model.learn(
    total_timesteps=100000
)
model.save(
    "ppo_cpu_scheduler"
)

print("Training Finished!")