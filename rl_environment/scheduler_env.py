import gymnasium as gym

from gymnasium import spaces

from workloads.generator import generate_workload


class CPUSchedulerEnv(gym.Env):

    def __init__(self, num_processes=5):

        super().__init__()

        self.num_processes = num_processes

        self.processes = []

        self.ready_queue = []

        self.current_time = 0

        self.timeline = []

        self.completed_processes = []

        self.action_space = spaces.Discrete(
            self.num_processes
        )

        self.observation_space = spaces.Box(
            low=0,
            high=100,
            shape=(self.num_processes * 3,),
            dtype=float
        )

    def reset(self, seed=None, options=None):

        super().reset(seed=seed)

        self.processes = generate_workload(
            num_processes=self.num_processes,
            seed=42
        )

        self.ready_queue = self.processes.copy()

        self.current_time = 0

        self.timeline = []

        self.completed_processes = []

        return self.get_state(), {}

    def get_state(self):

        state = []

        for process in self.ready_queue:

            state.extend([
                process.remaining_time,
                process.waiting_time,
                process.priority
            ])

        while len(state) < self.num_processes * 3:

            state.extend([
                0,
                0,
                0
            ])

        return state

    def step(self, action):

        if len(self.ready_queue) == 0:

            return (
                self.get_state(),
                0,
                True,
                False,
                {}
            )

        if action >= len(self.ready_queue):

            action = len(self.ready_queue) - 1

        selected_process = self.ready_queue.pop(action)

        start_time = self.current_time

        end_time = (
            self.current_time
            + selected_process.burst_time
        )

        self.timeline.append(
            (
                selected_process.pid,
                start_time,
                end_time
            )
        )

        for process in self.ready_queue:

            process.waiting_time += (
                selected_process.burst_time
            )

        self.current_time = end_time

        selected_process.completion_time = (
            self.current_time
        )

        selected_process.turnaround_time = (
            selected_process.completion_time
            - selected_process.arrival_time
        )

        selected_process.waiting_time = (
            selected_process.turnaround_time
            - selected_process.burst_time
        )

        self.completed_processes.append(
            selected_process
        )

        reward = -sum(
            p.waiting_time
            for p in self.ready_queue
        )

        next_state = self.get_state()

        terminated = (
            len(self.ready_queue) == 0
        )

        truncated = False

        info = {}

        return (
            next_state,
            reward,
            terminated,
            truncated,
            info
        )

    def get_completed_processes(self):

        return self.completed_processes

    def get_timeline(self):

        return self.timeline