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

    learning_rate=3e-4,
    n_steps=2048,
    batch_size=64,
    n_epochs=10,
    gamma=0.99,
    gae_lambda=0.95,
    clip_range=0.2,
    ent_coef=0.01,
    vf_coef=0.5,

    verbose=1
)

print("Starting Training...")

model.learn(
    total_timesteps=200000
)
model.save(
    "ppo_cpu_scheduler_general"
)

print("Training Finished!")