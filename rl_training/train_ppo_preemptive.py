from stable_baselines3 import PPO

from rl_environment.preemptive_scheduler_env import (
    PreemptiveCPUSchedulerEnv
)

print("Creating Preemptive Environment...")

env = PreemptiveCPUSchedulerEnv(
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
    total_timesteps=200000
)

model.save(
    "ppo_preemptive_scheduler"
)

print("Training Finished!")