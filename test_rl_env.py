from rl_environment.scheduler_env import CPUSchedulerEnv

env = CPUSchedulerEnv(
    num_processes=5
)

state, info = env.reset()

print("Initial State:")
print(state)

next_state, reward, terminated, truncated, info = env.step(0)

print("\nNext State:")
print(next_state)

print("Reward:", reward)

print("Terminated:", terminated)