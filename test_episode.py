from rl_environment.scheduler_env import CPUSchedulerEnv

env = CPUSchedulerEnv(
    num_processes=5
)

state, info = env.reset()

done = False

total_reward = 0

while not done:

    action = env.action_space.sample()

    state, reward, terminated, truncated, info = env.step(action)

    total_reward += reward

    done = terminated or truncated

    print("State:", state)
    print("Reward:", reward)
    print()

print("Total Reward:", total_reward)